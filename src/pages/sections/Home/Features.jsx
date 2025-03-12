import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Features = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "100px 0px", // Detect 100px before entering the viewport (from both top and bottom)
    });


    return (
        <div
            className="py-24 section-bg-dark sm:py-32"
            style={{
                backgroundImage: `url('./vector/dark_image_overlay.png')`,
                backgroundPosition: 'bottom right',
                backgroundSize: '90%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 ref={ref}
                        className={`text-3xl font-bold text-white lg:text-5xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}>What Can We Do For You?</h2>
                    <p ref={ref}
                        className={`mt-6 leading-6 text-white text-md transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}>
                        We are an independent private real estate agency that truly believes everything we can achieve is defined by our character.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col items-center mx-auto text-center w-80">
                            <dt className="mt-10 text-base font-semibold leading-7 text-white">
                                <Link ref={ref} to="/buy" className={`flex items-center justify-center w-20 h-20 mb-2 text-white bg-blue-600 rounded-lg transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                </Link>
                                <p ref={ref} className={`flex-auto mb-3 text-2xl text-center transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>Buy</p>
                            </dt>
                            <dd ref={ref} className={`flex flex-col flex-auto mt-1 text-base leading-7 text-white transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                <p className="flex-auto">We will help you find your dream home with our vast network</p>
                            </dd>

                            <dt className="mt-10 text-base font-semibold leading-7 text-white">
                                <Link ref={ref} to="/rent" className={`flex items-center justify-center w-20 h-20 mb-2 text-white bg-blue-600 rounded-lg transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                        />
                                    </svg>
                                </Link>
                                <p ref={ref} className={`flex-auto mb-3 text-2xl text-center transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>Rent</p>
                            </dt>
                            <dd ref={ref} className={`flex flex-col flex-auto mt-1 text-base leading-7 text-white transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                <p className="flex-auto">We manage renters and rentees with a personal touch</p>
                            </dd>
                        </div>

                        <div className="flex flex-col items-center max-sm:hidden">
                            <img ref={ref} src="./fre-hero-02.jpg" className={`rounded-lg transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`} alt="independent private real estate agency" />
                        </div>

                        <div className="flex flex-col items-center mx-auto text-center w-80">
                            <dt className="mt-10 text-base font-semibold leading-7 text-white">
                                <Link ref={ref} to="/appraisal" className={`flex items-center justify-center w-20 h-20 mb-2 text-white bg-blue-600 rounded-lg transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </Link>
                                <p ref={ref} className={`flex-auto mb-3 text-2xl text-center transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>Sell</p>
                            </dt>
                            <dd ref={ref} className={`flex flex-col flex-auto mt-1 text-base leading-7 text-white transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                <p className="flex-auto">Need to know the worth of your home? Find out with agents who know what they&rsquo;re doing.</p>
                            </dd>

                            <dt className="mt-10 text-base font-semibold leading-7 text-white">
                                <Link ref={ref} to="/leased" className={`flex items-center justify-center w-20 h-20 mb-2 text-white bg-blue-600 rounded-lg transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                        />
                                    </svg>
                                </Link>
                                <p ref={ref} className={`flex-auto mb-3 text-2xl text-center transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>Services</p>
                            </dt>
                            <dd ref={ref} className={`flex flex-col flex-auto mt-1 text-base leading-7 text-white transition-opacity duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                <p className="flex-auto">Browse through our recently leased properties</p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div >
        </div >
    );
};

export default Features;
