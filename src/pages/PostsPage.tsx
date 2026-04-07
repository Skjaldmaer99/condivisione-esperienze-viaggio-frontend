import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { TravelPostService } from '@/features/travelPosts/travelPost.service';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Post from '@/components/Post';


// debounce hook
function useDebounce(value: string, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

// schema zod per la ricerca
const searchFormSchema = z.object({
    search: z.string().trim() // niente min(1) per non bloccare input vuoto
});

const PostsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromUrl = searchParams.get('search') || '';

    // react-hook-form
    const form = useForm<z.infer<typeof searchFormSchema>>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: { search: searchFromUrl }
    });

    // legge il valore della search
    const searchValue = form.watch('search');

    // debounce
    const debouncedSearch = useDebounce(searchValue, 1000);

    // aggiorna la query string dell'URL senza ricaricare
    useEffect(() => {
        setSearchParams(
            debouncedSearch ? { search: debouncedSearch } : {}
        );
    }, [debouncedSearch, setSearchParams]);

    // fetch con React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts', debouncedSearch],
        queryFn: () => TravelPostService.list({ search: debouncedSearch }),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <div className="h-full mx-auto max-w-md pt-20 bg-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full px-4">
                <Field>
                    <Input
                        placeholder="Cerca"
                        type="search"
                        {...form.register("search")}
                    />
                    <FieldError>{form.formState.errors.search?.message}</FieldError>
                </Field>
            </form>

            {isLoading && <p className="px-4 py-2">Loading...</p>}
            {isError && <p className="px-4 py-2 text-red-500">Errore nel caricamento dei post</p>}

            {data?.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    )
}

export default PostsPage;