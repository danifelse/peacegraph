export default function CardProduct({ name, price, imageUrl }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={imageUrl} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className=" text-sm text-gray-700 dark:text-gray-400">
          Rp. {price?.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
