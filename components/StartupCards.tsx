import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

// 单个卡片组件
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    author,
    views,
    _createdAt,
    description,
    image,
    category,
    title,
    _id,
  } = post;

  return (
    <li className="startup-card">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary " />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={image || "https://placehold.co/500x300"}
          alt="placeholder"
          width={500} // Provide an estimated width based on your image's typical size or aspect ratio (adjust as needed)
          height={300} // Provide an estimated height (adjust as needed to match aspect ratio)
          className="startup-card_img"
          sizes="100vw" // Assumes the image may take full viewport width; adjust if the class implies a different responsive behavior (e.g., "50vw" if it's half-width)
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

// 卡片列表组件，用于动态加载
export default async function StartupCards({
  searchParams,
}: {
  // 确保这里的类型也是 Promise
  searchParams: Promise<{ query: string }>;
}) {
  // 在组件内部 await
  const params = await searchParams;
  const query = params?.query || "";

  const postsPromise = sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query || null },
  });
  const { data: posts } = await postsPromise;

  return (
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post: StartupTypeCard) => (
          <StartupCard key={post?._id} post={post} />
        ))
      ) : (
        <p className="no-results">No startups found</p>
      )}
    </ul>
  );
}