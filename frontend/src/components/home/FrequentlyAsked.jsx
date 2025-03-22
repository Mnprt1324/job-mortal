import { Accordian } from "./Accordian";

export const FrequentlyAsked = () => {
  const faqs = {
    recruiters: [
      {
        question: "How do I post jobs on ZipJob?",
        answer:
          "You can create a company profile by signing up as a 'Recruiter' and then create a job post under the 'Jobs' dashboard referring to any company you registered.",
      },
      {
        question: "Is posting a job free?",
        answer:
          "Yes! You can post a job for free with limited visibility, or choose a premium option for more reach.",
      },
      {
        question: "How do I edit my job post?",
        answer:
          "You can go to your dashboard, find your job listing, and click on the 'Edit' button.",
      },
      {
        question: "Can I delete a job post?",
        answer:
          "Yes, you can delete your job post anytime from your recruiter dashboard.",
      },
    ],
    jobSeekers: [
      {
        question: "How do I apply for a job?",
        answer:
          "Simply go to the job listing and click the 'Apply' button. Follow the instructions to submit your application.",
      },
      {
        question: "Can I track my applications?",
        answer:
          "Yes! You can track your applications from the 'My Applications' section in your dashboard.",
      },
      {
        question: "Is my profile visible to employers?",
        answer:
          "By default, your profile is visible to employers. However, you can manage your privacy settings from your account.",
      },
      {
        question: "How do I get job recommendations?",
        answer:
          "Our system suggests jobs based on your skills, experience, and preferences set in your profile.",
      },
    ],
  };

  return (
    <section className="py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-gray-900 font-semibold md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Find answers to common questions from recruiters and job seekers.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="grid grid-cols-1 gap-10 max-w-6xl md:grid-cols-2 mx-auto px-5">
        {/* Recruiters Section */}
        <div className="space-y-4">
          <h2 className="text-2xl text-gray-950 font-semibold">For Recruiters</h2>
          <div className="space-y-3">
            {faqs.recruiters.map((faq, index) => (
              <Accordian key={index} title={faq.question} content={faq.answer} />
            ))}
          </div>
        </div>

        {/* Job-Seekers Section */}
        <div className="space-y-4">
          <h2 className="text-2xl text-gray-950 font-semibold">For Job-Seekers</h2>
          <div className="space-y-3">
            {faqs.jobSeekers.map((faq, index) => (
              <Accordian key={index} title={faq.question} content={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
