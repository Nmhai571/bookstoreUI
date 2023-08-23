import { writeFileSync } from "fs";
import RSS from "rss";
import { bookApi } from "../apis/bookApi";
export default async function getRSS() {
	const siteURL = "https://www.bookove.store";
	const allBlogs = (await bookApi.getAll(1, 1000)) as any;

	const feed = new RSS({
		title: "Võ Hoài Nam",
		description: "Lorem lorem lorem",
		site_url: siteURL,
		feed_url: `${siteURL}/feed.xml`,
		language: "en",
		pubDate: new Date(),
		copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
	});

	allBlogs.map((product: any) => {
		feed.item({
			title: product.title,
			url: `${siteURL}/product/${product.slug}`,
			date: product.createdAt,
			description: product.description,
		});
	});

	writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
