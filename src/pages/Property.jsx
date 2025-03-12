import { useLocation, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Property() {
    const { slug } = useParams();
    const location = useLocation();
    const { state } = location;
    const [property, setState] = useState(state?.property);
    // console.log(property);
    console.log(slug);

    // const searchParams = new URLSearchParams(location.search);
    // const id = searchParams.get("id");
    const queryString = location.search.substring(1); // Remove the "?"
    const paramsArray = queryString.split(/[?&]/); // Split on "?" or "&"
    const params = {};

    paramsArray.forEach(param => {
        const [key, value] = param.split("=");
        if (key && value) {
            params[key] = decodeURIComponent(value);
        }
    });

    const id = params.id;
    const typee = params.status;
    console.log(id);
    useEffect(() => {
        const fetchProperty = async () => {
            fetch(`https://focalrealestate.com.au/internal_api/framework/api/property-single-data?status=${typee}&id=${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.items);
                    // const property = data.items.filter((property) => property.id == id);
                    // console.log('property data',property);
                    // setState(...property);
                    setState(data);
                });
        };
        if (!property) {
            fetchProperty();
        }
    }, [id]);



    useEffect(() => {
        if (property) {
          console.log("Property data loaded:", property);
        }
      }, [property]);

    const [messageSent, setMessageSent] = useState('');

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // const { type, status, headline, images, streetNumber, street, postcode, suburb, address_state, country, description, bedrooms, bathrooms, carports, name, telephone } = property;
    const { 
        type, status, heading, streetNumber, street, postcode, 
        suburb, address_state, country, description, bed, 
        bath, carports, name, telephone 
      } = property || {};

    const images = property?.photos;

    const [title, setTitle] = useState('');

    const newDescription = description?.replaceAll("&#x2022;", "•");
    

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // fetch('http://localhost/auclient/quarantine/internal_api/properties.php', {
        fetch('https://focalrealestate.com.au/internal_api/framework/api/property-listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                setMessageSent(true);
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to send data.');
                }
            })
            .then(responseData => {
                // console.log('Data sent successfully!', responseData);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images?.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images?.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (type === 'Rental') {
            setTitle("PROPERTIES FOR RENT");
        }
        if (type !== 'Rental' && status === "Current") {
            setTitle("PROPERTIES FOR SALE");
        }
        if (status === "Leased") {
            setTitle("LEASED PROPERTIES");
        }
        if (status === "Offmarket") {
            setTitle("RECENTLY SOLD PROPERTIES");
        }
    }, []);

    return (
        
        <div>
            <Helmet>
                <title>{title}-Focal Real Estate</title>
                <meta httpEquiv="content-language" content="en-us" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content={heading??""} />
                {/* <link rel="canonical" href={pageInformation?.canonical_tag} />  */}
                <link rel="icon" type="image/png" href="" />
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
                <meta name="generator" content="Focal Real Estate" />
                <meta name="author" content="Focal Real Estate" />
                {/* <meta name="og:image" content={images?images[0]:''}/> */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={heading}/>  
                {/* <meta name="twitter:image" content={images?images[0]:''}/> */}
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:site_name" content="Focal Real Estate"/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <section>
                <div className="relative overflow-hidden isolate">
                    <img src="/leased_header.jpg" alt="" className="absolute inset-0 object-cover w-full h-full -z-10" />
                    <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-55">
                        <div className="text-center">
                            <h1 className="mt-3 text-5xl font-semibold leading-8 tracking-tight text-white sm:text-5xl">{title}</h1>
                        </div>
                    </div>
                    <img src="/bg-graphic-01.png" alt="" className="absolute inset-0 object-cover w-full h-full -z-10" />
                </div>
            </section>
            <section>
                <div className="relative mb-10 overflow-hidden bg-white isolate">
                    <div className="flex flex-col px-6 mx-auto max-w-7xl sm:flex-row sm:py-20 lg:px-8 ">
                        <div className="flex-grow flex-shrink-0 mx-auto mr-20 max-sm:flex-col max-sm:mx-auto">
                            <div className="relative max-w-5xl mr-20">
                                <button type="button" onClick={goToPreviousImage} className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 bg-gray-200">
                                    <span className="text-2xl" aria-hidden="true">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </span>
                                    <span className="sr-only">Previous</span>
                                </button>
                                {property?.photos === undefined || property?.photos === null || property?.photos === "" || !property?.photos ? <img className="h-[240px] sm:h-[300px] md:h-[500px] object-cover" style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        // height: '500px',
                                    }}
                                     src="../no-image.jpg" alt="" />
                                :<img
                                    src={images[currentImageIndex]?.url}
                                    className='h-[240px] sm:h-[300px] md:h-[500px]'
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        // height: '500px',
                                    }}
                                    alt={`Slide ${currentImageIndex + 1}`}
                                />}

                                <button type="button" onClick={goToNextImage} className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 bg-gray-200">
                                    <span className="sr-only">Next</span>
                                    <span className="text-2xl" aria-hidden="true">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='mt-5 w-[380px] sm:w-[500px] md:w-[800px]'>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">{heading}</h1>
                                {/* <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">{headline}</h1> */}
                                {/* <h3 className="mt-4 font-light tracking-tight text-gray-500 text-md sm:text-md">{streetNumber} {street}, {address_state}, {suburb}, {country} {postcode}</h3> */}
                                <h3 className="mt-4 font-light tracking-tight text-gray-500 text-md sm:text-md">{property?.address?.streetNumber} {property?.address?.street}, {property?.address?.state?.name}, {property?.address?.suburb?.name}, {property?.address?.country?.name} {property?.address?.suburb?.postcode}</h3>
                                <button  className="inline-flex items-center justify-center px-2 py-2 mt-3 mb-4 text-sm text-white border border-transparent rounded-lg gap-x-2 font-regular bg-focal-blue">
                                    {status}
                                </button>
                                <hr />
                                <div className="mt-4 mb-4 font-light text-gray-500 text-md">
                                    <img src="/icons/bed.png" className="inline mr-1" /> {bed} Bed
                                    {/* <img src="/icons/bed.png" className="inline mr-1" /> {bedrooms} Bed */}
                                    <img src="/icons/bath.png" className="inline ml-3 mr-1" /> {bath} Bath
                                    {/* <img src="/icons/bath.png" className="inline ml-3 mr-1" /> {bathrooms} Bath */}
                                    <img src="/icons/car.png" className="inline ml-3 mr-1" /> {carports} Garage
                                </div>
                                <hr />
                                <p className="mt-10 mb-10 font-light text-gray-500 text-md">
                                    {newDescription && newDescription.replaceAll("&#xa3;","£").replaceAll("â‚¬", " ").replaceAll("&euro;","€").replaceAll("Ã"," ").replaceAll("¯¼â"," ")}
                                </p>
                                <div className="flex flex-col mt-5">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="overflow-hidden">

                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                    <tbody className="flex flex-col gap-3 divide-y divide-gray-200 dark:divide-gray-700 sm:flex-row">
                                                        <tr>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 bg-gray-100 whitespace-nowrap dark:text-gray-800">Address</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">{property?.address?.streetNumber} {property?.address?.street}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 bg-gray-100 whitespace-nowrap dark:text-gray-800">Suburb</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">{property?.address?.suburb?.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 bg-gray-100 whitespace-nowrap dark:text-gray-800">Post Code</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">{property?.address?.suburb?.postcode}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 bg-gray-100 whitespace-nowrap dark:text-gray-800">State</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-gray-200">{property?.address?.country?.name}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mx-auto mt-10 mb-10" style={{ width: '100%', height: '400px' }}>
                                    <iframe width="100%"
                                        height="100%"
                                        allowFullScreen src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10464.769776254596!2d153.10204664491542!3d-27.60897748948009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91437fb566385b%3A0xc798107977a9f7c4!2s10c%2F11%20Kingston%20Rd%2C%20Underwood%20QLD%204119%2C%20Australia!5e0!3m2!1sen!2sus!4v1701497542634!5m2!1sen!2sus" frameBorder="0"></iframe>
                                </div>
                            </div>
                        </div>
                        <div>
                        <form className="w-full p-0">
                            <div className="p-5 border rounded-md">
                                <div className="mb-8">
                                    <img src="/philip.jpeg" className='w-20 mb-2' />
                                    <label className="block text-2xl font-semibold text-focal-blue">
                                        {name}
                                    </label><label className="block text-xl font-light text-gray-600">
                                        {telephone}
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm">
                                        Name
                                    </label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 mt-2 border rounded-md" placeholder="Name" />
                                </div>{' '}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm">
                                        Email
                                    </label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 mt-2 border rounded-md" placeholder="Email" />
                                </div>{' '}
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm">
                                        Phone
                                    </label>
                                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 mt-2 border rounded-md" placeholder="Phone" />
                                </div>{' '}
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm">
                                        Message
                                    </label>
                                    <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full p-2 mt-2 border rounded-md">Hi, I'm interested in {streetNumber} {street}, {address_state}, {suburb}, {country} {postcode}, Could you please contact me with more information.
                                    </textarea>
                                </div>
                                <div className="mb-4">
                                    <button type="button" onClick={handleSubmit} className="w-full px-4 py-2 text-white rounded bg-focal-blue">
                                        Send
                                    </button>
                                </div>
                                {messageSent && (
                                    <div className="mb-4">
                                        <p className='font-semibold text-focal-blue text-md'>Your message has been sent successfully!</p>
                                    </div>
                                )}
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </div >
    );
}


// export default Property;