export default function LoadingSpinner({ size = 'md' }) {
  const sz = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-16 w-16' : 'h-10 w-10';
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sz} animate-spin rounded-full border-4 border-green-200 border-t-green-600`} />
    </div>
  );
}
