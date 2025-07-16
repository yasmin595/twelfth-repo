


const NewsletterSection = () => {
  return (
    <section className="bg-green-600 mt-10 py-16 relative overflow-hidden  rounded-2xl my-8 ">
      <div className="max-w-3xl mx-auto px-4 text-center text-white rounded-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Subscribe to Stay Updated!</h2>
        <p className="mb-8 leading-relaxed text-sm sm:text-base">
          Get notified whenever a new lost or found item is posted. Stay connected and help reunite people with their belongings.
        </p>

        <form className="flex items-center justify-center gap-2 bg-white p-2 rounded-md shadow-md max-w-xl mx-auto">
          <div className="bg-green-100 p-2 rounded-md">
         
          </div>
          <input
            type="email"
            placeholder="Enter your Email..."
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;