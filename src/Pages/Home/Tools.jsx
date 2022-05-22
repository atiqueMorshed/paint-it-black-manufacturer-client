import { Link } from 'react-router-dom';
import paintbrush from '../../Assets/images/items/item01.jpg';
import paintRoller from '../../Assets/images/items/item02.jpg';
import paints from '../../Assets/images/items/item03.jpg';

const Tools = () => {
  return (
    <div id="tools" className="my-32">
      <h1 className="text-4xl text-center font-medium pb-16">
        Tools We Provide
      </h1>
      <div className="flex flex-col md:flex-row h-[1200px] md:h-[600px]">
        <div className="item1 relative flex-1">
          <img
            className="w-full h-full object-center object-cover"
            src={paintbrush}
            alt="Paintbrush"
          />
          <div className="absolute bottom-5 left-6 md:left-10 lg:bottom-10 lg:left-20 text-black dark:text-white">
            <div className="bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-40 p-4 rounded flex flex-col gap-2">
              <h1 className="text-2xl font-medium mb-2">PaintBrush</h1>
              <p className="text-[#3ABFF8] text-xl">
                Built with best quality bristles!
              </p>
              <p className="">
                Minimum Order Quantity: <span className="font-bold">1000</span>
              </p>
              <p className="">
                Total Available: <span className="font-bold">12000</span>
              </p>
              <p className="">
                Price Per Unit: <span className="font-bold">60</span>
              </p>

              <Link to="/items/brushes">
                <button className="btn rounded">Order Now!</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="item2 relative flex-1">
          <img
            className="w-full h-full object-center object-cover"
            src={paintRoller}
            alt="Paint Roller"
          />
          <div className="absolute bottom-5 left-6 md:left-10 lg:bottom-10 lg:left-20 text-black dark:text-white">
            <div className="bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-40 p-4 rounded flex flex-col gap-2">
              <h1 className="text-2xl font-medium mb-2">Paint Roller</h1>
              <p className="text-xl">We use high quality Synthetic roller</p>
              <p className="">
                Minimum Order Quantity: <span className="font-bold">1000</span>
              </p>
              <p className="">
                Total Available: <span className="font-bold">12000</span>
              </p>
              <p className="">
                Price Per Unit: <span className="font-bold">60</span>
              </p>

              <Link to="/items/rollers">
                <button className="btn rounded">Order Now!</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="item-3 relative h-[600px] text-black">
        <img
          className="w-full h-full object-center object-cover"
          src={paints}
          alt="Paints"
        />
        <div className="absolute bottom-5 left-6 md:left-10 lg:bottom-10 lg:left-20 text-black dark:text-white">
          <div className="bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-40 p-4 rounded flex flex-col gap-2">
            <h1 className="text-2xl font-medium mb-2">Color Palettes</h1>
            <p className="text-xl">Get accurate color palettes from us.</p>
            <p className="">
              Minimum Order Quantity: <span className="font-bold">1000</span>
            </p>
            <p className="">
              Total Available: <span className="font-bold">12000</span>
            </p>
            <p className="">
              Price Per Unit: <span className="font-bold">60</span>
            </p>
            <Link to="/items/colors">
              <button className="btn rounded">Order Now!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
