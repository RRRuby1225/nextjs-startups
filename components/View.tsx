import { Ping } from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { after } from "next/server";

const View = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params; 

const { views: totalViews } = await client.fetch(STARTUPS_VIEWS_QUERY, {
    id,
});

after(
    async () =>
    {
        await client.patch(id).set({ views: totalViews + 1 }).commit();
    }
);

return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>
        <p className="view-text">
            <span className="font-black">{totalViews} views</span>
        </p>
    </div>
);
}


export default View;