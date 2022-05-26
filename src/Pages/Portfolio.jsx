import React from 'react';

const Portfolio = () => {
  return (
    <div className="flex flex-col w-11/12 max-w-[800px] mx-auto my-20">
      <h1 className="text-4xl font-bold text-center mb-16">Portfolio</h1>
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold text-center my-4 text-primary">
          Atique Morshed
        </h1>
        <h1 className="text-2xl font-medium text-center">
          atique.morshed1 @gmail.com
        </h1>

        <h1 className="text-4xl font-bold text-center mt-12 mb-4 text-primary">
          Education
        </h1>
        <h1 className="text-2xl font-medium text-center">
          Bachelor of Science in Computer Science, BRAC UNIVERSTY
        </h1>

        <h1 className="text-4xl font-bold text-center mt-12 mb-4 text-primary">
          Skills
        </h1>
        <h1 className="text-xl font-bold text-center mb-1 text-primary">
          Expertise
        </h1>
        <h1 className="font-medium">
          Tailwind, React.js, Redux, Express.js, MongoDB, MySQL, Java,
          Javascript (ES6), TypeScript, HTML, CSS, SASS.
        </h1>
        <h1 className="text-xl font-bold text-center mt-4 mb-1 text-primary">
          Comfortable
        </h1>
        <h1 className="font-medium">
          Bootstrap, Stripe, PWA, C++, Python, MatLAB, Figma, Adobe Photoshop,
          Adobe Premiere Pro.
        </h1>
        <h1 className="text-xl font-bold text-center mt-4 mb-1 text-primary">
          Familiar
        </h1>
        <h1 className="font-medium">Material UI, JSP/Servlet, PHP.</h1>
        <h1 className="text-xl font-bold text-center mt-4 mb-1 text-primary">
          Tools
        </h1>
        <h1 className="font-medium">
          Git, VS Code, Chrome Dev Tools, Heroku, Firebase.
        </h1>
        <h1 className="text-xl font-bold text-center mt-4 mb-1 text-primary">
          Languages
        </h1>
        <h1 className="font-medium">
          Bangla (Native), English (Conversational).
        </h1>

        <h1 className="text-4xl font-bold text-center mt-12 mb-4 text-primary">
          Projects
        </h1>
        <h1 className="text-2xl font-medium text-center">
          1. CarHouse - Car Inventory Management
        </h1>
        <div className="mt-4 flex gap-2 items-center">
          <a
            href="https://carhouse-warehouse-management.web.app/"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Website
          </a>

          <a
            href="https://github.com/atiqueMorshed/carHouse-inventory-management-client"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Client
          </a>

          <a
            href="https://github.com/atiqueMorshed/carHouse-inventory-management-server"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Server
          </a>
        </div>

        <h1 className="text-2xl font-medium text-center mt-8">
          2. GRAPH -Wild Photography
        </h1>
        <div className="mt-4 flex gap-2 items-center">
          <a
            href="https://ph-milestone-10-graph.web.app/"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Website
          </a>

          <a
            href="https://github.com/atiqueMorshed/GRAPH-wild-photography"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Github
          </a>
        </div>

        <h1 className="text-2xl font-medium text-center mt-8">
          3. Clothin - Ecommerce website
        </h1>
        <div className="mt-4 flex gap-2 items-center">
          <a
            href="https://react-ecommerce-01x01.herokuapp.com/"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Website
          </a>

          <a
            href="https://github.com/atiqueMorshed/21-05-React-EcommerceV1"
            target="_blank"
            rel="noreferrer"
            className="py-2 px-4 bg-base-200 rounded-full"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
