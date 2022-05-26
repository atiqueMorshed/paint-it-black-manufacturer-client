const Blog = () => {
  return (
    <div className="flex gap-8 flex-col justify-center items-center pt-32  w-11/12 max-w-[700px] mx-auto">
      <h1 className="text-4xl font-medium text-center mb-6">Blog</h1>
      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          How will you improve the performance of a React Application
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            Keeping react state as simple as possible is a great way to improve
            performance. There are many memoization techniques like useCallback
            or useMemo or Memo which helps stop unnecessary rerenders. For local
            states, it should be lifted only to the point where it will actually
            be used. Lazy loading react imports is another way. This can be done
            by using React.azy and Suspense. If using third party state
            management library, we should try to use its memoization techniques.
            For example, redux can cache selectors using createSelector. Apart
            from these, we can also optimize images and graphics.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          What are the different ways to manage a state in a React application
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            The most basic way is using useState. this is generally used as a
            local state. To manage a global state, useContext is used. There is
            also useReducer. There are also context patterns which can be
            context api + usestate or context api + useReducer. This gives us an
            easy interface to manage global state. One of the most popular third
            party global state management library is redux.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          How does prototypical inheritance work?
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            If we log an object, we will see a property called prototype. This
            is always available in an object. This allows us to create
            inheritance between objects. With this, we can add different
            properties and methods to an object. This also gives us an interface
            to inherit properties and methods of a different object.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          Why you do not set the state directly in React?
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            Whenever we create an object ( or array), js creates a reference for
            that. If we add new elements to the same object, the reference
            remains the same. This is very important to note since in useState,
            if we add new fields to an object in state object, the reference
            will remain the same. And if the reference remains the same, react
            will not rerender that state's component.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <div>
            <p className="text-sm pt-2">
              /- We first define a searchfield to hold input value. we control
              the input field with these state variables.
            </p>
            <p className="bg-base-200">
              const [serachField, setSearchField] = useState("");
            </p>
            <p className="text-sm pt-4">
              /- We also will also need a state to hold filtered products.
            </p>
            <p className="bg-base-200">
              const [filteredProducts, setFilteredProducts] = useState([]);
            </p>
            <p className="text-sm pt-4">
              /- We then call our filter every time searchfield changes{' '}
              <span className="text-success">
                (in useEffect with searchField as dependency list)
              </span>
            </p>
            <p className="bg-base-200">
              {' '}
              const newProducts = products.filter(product =>
              product.name.toLowerCase().includes(searchfield.toLowerCase());
            </p>
            <p className="bg-base-200">setFilteredProducts(newProducts);</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-base-200 shadow">
        <h1 className="text-2xl border-b border-base-200 shadow p-6">
          What is a unit test? Why should write unit tests?
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            An unit is smallest piece of isolated code. This can be a function
            or a component. Unit testing allows us to test individual units of
            our code. The goal is to ensure that every unit is doing it's job
            properly. This is the starting point of testing. Unit testing is
            done before integration testing. We should write unit tests to
            ensure that our units are working as they should be and also to
            check if they are passing the requirements. Unit testing is also
            necessary before integration testing because if there are faulty
            units and we perform integration testing without unit testing, there
            will be a lot of errors since these faulty units will create so many
            faulty combinations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
