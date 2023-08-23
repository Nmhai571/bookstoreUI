import Image from "next/image";
import { useRouter } from "next/router";
import APP_PATH from "../../PATH";
// import { Swiper, SwiperSlide } from "swiper/react";

export default function Slide() {
	const router = useRouter();
	return (
		<>
			<section className="container py-16 bg-purple-100 hero">
				{/*  <Swiper className='h-full' spaceBetween={8} autoplay>
                    <SwiperSlide className='aspect-5/2'>
                        <Image className='rounded-md' src="/slide/book1.png" layout="fill" objectFit="cover" loading='lazy' />
                    </SwiperSlide>
                    <SwiperSlide className='aspect-5/2'>
                        <Image className='rounded-md' src="/slide/book2.jpg" layout="fill" objectFit="cover" loading='lazy' />
                    </SwiperSlide>
                    <SwiperSlide className='aspect-5/2'>
                        <Image className='rounded-md' src="/slide/book3.jpg" layout="fill" objectFit="cover" loading='lazy' />
                    </SwiperSlide>
                </Swiper> */}
				<div className="flex-row-reverse gap-8 py-5 hero-content lg:flex-col">
					<div className="flex-shrink-0 w-60 image-container">
						<Image
							src="https://res.cloudinary.com/dtjkf2eeq/image/upload/v1692711388/BookStore/x99hagzyp5o1dhxzjapu.png"
							className="rounded-lg shadow-2xl image"
							alt="book"
							layout="fill"
							priority={true}
						/>
					</div>
					<div>
						<h1 className="text-6xl font-extrabold text-purple-800 md:text-4xl">
							Special 50% Off!
						</h1>
						<h2 className="mt-2 text-purple-800 md:text-xl">for out student community</h2>
						<p className="py-6 leading-6 md:py-3">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
							exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Provident
							cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
							quasi. In deleniti eaque aut repudiandae et a id nisi. Provident cupiditate
							voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
							deleniti eaque aut repudiandae et a id nisi.
						</p>
						<button className="btn btn-primary" onClick={() => router.push(APP_PATH.PRODUCT)}>
							Get Started
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
