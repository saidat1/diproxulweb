"use client";
import { useState } from "react";
import { Book, DollarSign, HelpCircle, Star, User, Phone, CircleHelp, Search, Bot, TriangleAlert, Facebook, X } from "lucide-react"; // Icons for the topics
import { ChangeEvent } from "react";
import Image from "next/image"; // For image import
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubscribe = () => {
    // Implement subscribe logic here
    console.log("Subscribed with email:", email);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const topics = [
    { id: 1, icon: <Book className="w-12 h-12 text-orange-500 mb-4 mx-auto" />, title: "Knowledge Base", description: "Explore articles and resources related to school management systems." },
    { id: 2, icon: <DollarSign className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />, title: "Billing & Licensing", description: "Manage school fees, subscriptions, and licensing details." },
    { id: 3, icon: <HelpCircle className="w-12 h-12 text-blue-500 mb-4 mx-auto" />, title: "General Help", description: "Help contributed by users for common issues in the school system." },
    { id: 4, icon: <Star className="w-12 h-12 text-indigo-500 mb-4 mx-auto" />, title: "Reviews", description: "User-uploaded reviews and experiences with our school management system." },
    { id: 5, icon: <User className="w-12 h-12 text-green-500 mb-4 mx-auto" />, title: "Account", description: "Manage your account and user roles in the system." },
    { id: 6, icon: <CircleHelp className="w-12 h-12 text-pink-500 mb-4 mx-auto" />, title: "FAQ", description: "Frequently asked questions about the school management platform." },
    { id: 7, icon: <TriangleAlert className="w-12 h-12 text-red-500 mb-4 mx-auto" />, title: "Terms & Conditions", description: "Guidelines to be aware of for a smooth ride between us and you." },
    { id: 8, icon: <Bot className="w-12 h-12 text-purple-500 mb-4 mx-auto" />, title: "Human or AI Support", description: "Technical assistance for system troubleshooting." },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Background Image with Overlay */}
        <div className="relative min-h-[50vh]">
          <Image
            src="/images/school-help.png"
            alt="Support Center Background"
            layout="fill"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-green-600 opacity-50"></div> {/* Gray Overlay */}
          <h1 className="absolute inset-0 top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold z-10 text-center">
           A Help Center & Resources <br/> For You.
          </h1>
          <div className="absolute inset-0 top-2/3 z-10 text-center  mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for a topic..."
                className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      <div className="max-w-screen-xl mx-auto justify-center sm:px-16 ">
        

        {/* Select a Topic Section */}
        <section className="mt-16 text-center mb-16 ">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Select a Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                >
                  {topic.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600 mt-2">{topic.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xl text-gray-600">No topics found</p>
            )}
          </div>
        </section>

        {/* Support Channels Section */}
        <section className="mt-16 text-center p-8 rounded-lg mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Support Channels</h2>
          <div className="flex justify-center gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <Phone className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Phone Support</h4>
              <p className="text-gray-600">Whatsapp us at +44-800-123-4567 for direct assistance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <Facebook className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Community Forums</h4>
              <p className="text-gray-600">Join the community discussions for help and updates.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <X className="w-12 h-12 text-black mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Twitter</h4>
              <p className="text-gray-600">Follow us on Twitter for support and news updates.</p>
            </div>
          </div>
        </section>

        {/* Important Articles Section */}
        <section className="mt-16 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Important Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Getting Started</h3>
              <p className="text-gray-600 mt-2">Learn how to get started with our school management system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Advanced Features</h3>
              <p className="text-gray-600 mt-2">Explore advanced features for school administration.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Troubleshooting</h3>
              <p className="text-gray-600 mt-2">Solutions for common issues in the school system.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section with Accordion from ShadCN UI */}
<section className="mt-16 text-left">
  <h2 className="text-4xl text-center font-semibold text-gray-800 mb-8">Frequently Asked Questions</h2>
  <div className="max-w-4xl mx-auto">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Diproxuls?</AccordionTrigger>
        <AccordionContent>
          Diproxuls is an online school management software that allows you to manage admissions, student information, scheduling, and grading functionalities anytime and anywhere.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How will Diproxuls support my unique educational system?</AccordionTrigger>
        <AccordionContent>
          Diproxuls is able to support different kinds of educational systems. Grading criteria, class levels, timetable, and report cards are all customizable within minutes. We will demonstrate it to you during your 30-day trial period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What kind of software programs do I require to run Diproxuls?</AccordionTrigger>
        <AccordionContent>
          All you need is a Web browser that can support HTML5 such as Google Chrome, Mozilla Firefox, and Internet Explorer (IE 9 and above).
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Can I install Diproxuls on my own servers?</AccordionTrigger>
        <AccordionContent>
          We currently only provide an online version of our software. In this way, we're able to guarantee availability of our servers, provide support to all users, as well as provide continuous upgrades in an efficient manner.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>How do I integrate my school's data with Diproxuls?</AccordionTrigger>
        <AccordionContent>
          Diproxuls provides a step-by-step flow that will help you import your current data. Your files need to be in Microsoft Excel (.xls) format.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Do you offer support to clients?</AccordionTrigger>
        <AccordionContent>
          Our technical support can assist you with any technical problems you may face. Support is provided throughout the week by email (support@Diproxuls.com), by phone, as well as live chat anytime during weekdays. This is absolutely free of charge.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Does Diproxuls offer training services?</AccordionTrigger>
        <AccordionContent>
          It is our hope that our interface is intuitive and easy to follow from the start. But if you encounter problems, you have access to our live chat support personnel who are always happy to assist you. We're also in the process of providing online videos that will walk you through some of our more involved processes. All in all, you will not need to pay for expensive training.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>Does Diproxuls offer custom software development?</AccordionTrigger>
        <AccordionContent>
          Our philosophy and approach to a shared platform across many schools means that we cannot provide custom development for any specific school. However, we do provide upgrades and enhancements based on demand. So let us know what you need, and if there's a demand for it, we'll see if it's something that we can include in a future release, and at no additional charge.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger>How much does Diproxuls cost?</AccordionTrigger>
        <AccordionContent>
          Diproxuls has a monthly price of $24.9/month, and an annual price of $239.9/year. We also offer a free one-month trial so you can experience the platform firsthand before committing to a subscription.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-10">
        <AccordionTrigger>Are there any hidden fees I should know about?</AccordionTrigger>
        <AccordionContent>
          The only fee is the subscription fee. Everything is included with that price, including access to online training materials and support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-11">
        <AccordionTrigger>Will I be bound to any long-term contracts?</AccordionTrigger>
        <AccordionContent>
          No. We charge on a monthly basis, and you may terminate the account with a one-month notice.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-12">
        <AccordionTrigger>How do you ensure continuous availability of the Diproxuls internet application?</AccordionTrigger>
        <AccordionContent>
          We ensure that you have 99% uptime. To deliver this level of reliability, we host our applications on world-class data centers. These are the same data centers that carry traffic for international telcos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-13">
        <AccordionTrigger>How does Diproxuls ensure my school's data is safe from loss?</AccordionTrigger>
        <AccordionContent>
          Your school's data is important. At midnight every day, we back up your school's important data to a different physical location. This is fully automatic, and you don't have to do anything to activate this service.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-14">
        <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
        <AccordionContent>
          We provide our clients with several online credit card payment methods which include Visa, MasterCard, and American Express. We accept currency in US dollars, and our payment gateway is powered by Stripe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-15">
        <AccordionTrigger>This is an internet application. Is it safe for me to transmit my information via the Web?</AccordionTrigger>
        <AccordionContent>
          Your data is treated as importantly as online banks treat financial information, which is why we use the same Secure Sockets Layer (SSL) technology when transmitting information between your computer and our servers.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</section>


        {/* Green Button for Additional Questions */}
        <section className="mt-16 text-center">
          <Button
            className="p-4 mb-4 bg-green-600 text-white text-xl rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            onClick={() => window.location.href = "mailto:support@company.com"}
          >
            Do you have more questions? Mail us!
          </Button>
        </section>
      </div>
    </div>
  );
}
