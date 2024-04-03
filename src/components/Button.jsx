function Button({innerRef, onClick, text}) {
  return (
    <button ref={innerRef} onClick={onClick} className="rounded-md border border-transparent px-5 py-2 text-base font-medium text-white bg-slate-800 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      {text}
    </button>
  );
}

export default Button;