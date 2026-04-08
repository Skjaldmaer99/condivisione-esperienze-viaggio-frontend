import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Post from '@/components/Post';
import { TravelPostService } from '@/features/travelPosts/travelPost.service';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useInView } from 'react-intersection-observer';

// --- Debounce hook ---
function useDebounce(value: string, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

// --- Schema zod per la ricerca ---
const searchFormSchema = z.object({
    search: z.string().trim(),
});

const PostsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromUrl = searchParams.get('search') || '';

    // react-hook-form
    const form = useForm<z.infer<typeof searchFormSchema>>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: { search: searchFromUrl },
    });

    // legge il valore della search
    const searchValue = form.watch('search');
    const debouncedSearch = useDebounce(searchValue, 1000);

    // aggiorna query string senza ricaricare
    useEffect(() => {
        setSearchParams(debouncedSearch ? { search: debouncedSearch } : {});
    }, [debouncedSearch, setSearchParams]);

    // --- infinite query ---
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['posts', debouncedSearch],
        queryFn: ({ pageParam }: { pageParam: number }) =>
            TravelPostService.list({ search: debouncedSearch, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: unknown[], allPages: unknown[][]) => {
            if (lastPage.length === 0) return undefined; // fine pagine
            return allPages.length + 1; // prossima pagina
        },
        staleTime: 1000 * 60 * 5,
    });

    // --- infinite scroll trigger ---
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return <p className="px-4 py-2">Loading...</p>;
    if (isError) return <p className="px-4 py-2 text-red-500">Errore nel caricamento dei post</p>;

    return (
        <div className="h-full min-h-screen mx-auto max-w-md py-20 bg-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full px-4">
                <Field>
                    <Input placeholder="Cerca" type="search" {...form.register('search')} />
                    <FieldError>{form.formState.errors.search?.message}</FieldError>
                </Field>
            </form>

            {data?.pages.map((page, i) => (
                <div key={i}>
                    {page.map((post) => (
                        <Post key={post.id} {...post} />
                    ))}
                </div>
            ))}

            {/* trigger per infinite scroll */}
            <div ref={ref} className="py-4 text-center">
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Scroll down to load more'
                        : 'Nessun altro post'}
            </div>
        </div>
    );
};

export default PostsPage;