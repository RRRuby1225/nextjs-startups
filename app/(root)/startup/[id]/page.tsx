import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

// 1. PostContent 组件现在接收 Promise 类型的 params
async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  // 2. await 操作安全地在组件内部进行
  const { id } = await params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) {
    notFound();
  }

  const parsedContent = markdownit().render(post?.pitch || "");

  return (
    <>
      {/* 
        3. 将静态布局部分也移回到 PostContent 内部。
           这是因为这些布局（如 pink_container）的 *内容* 是动态的。
           当 PostContent 挂起时，整个粉色区域及其内容都应该被 fallback 替代。
      */}
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={500}
          height={300}
          className="w-full h-auto rounded-xl"
          sizes="100vw"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {/* ... 剩余的 JSX 保持不变 ... */}
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No pitch details available.</p>
          )}
        </div>
        <hr className="divider" />
      </section>
    </>
  );
}

// 4. Page 组件恢复为完全同步的静态外壳
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      {/* 5. 将 params Promise 直接传递给被 Suspense 包裹的子组件 */}
      <Suspense fallback={<Skeleton className="w-full h-screen" />}>
        <PostContent params={params} />
      </Suspense>

      <Suspense fallback={<Skeleton className="view-skeleton" />}>
        <View />
      </Suspense>
    </>
  );
}
