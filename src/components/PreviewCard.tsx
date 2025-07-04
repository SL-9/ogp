import { OGPData, PreviewType } from '@/types';
import Image from 'next/image';

interface PreviewCardProps {
  type: PreviewType;
  data: OGPData;
}

export default function PreviewCard({ type, data }: PreviewCardProps) {
  const isTwitter = type === 'twitter';

  return (
    <div className={`border rounded-lg overflow-hidden max-w-[${isTwitter ? '500px' : '600px'}] bg-white`}>
      {data.image && (
        <div className="relative w-full h-[250px]">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {data.siteName && (
          <p className="text-sm text-gray-500 mb-2">
            {data.siteName}
          </p>
        )}
        <h4 className="font-bold text-lg mb-2 line-clamp-2">
          {data.title}
        </h4>
        <p className="text-gray-700 text-sm line-clamp-3">
          {data.description}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {data.url}
        </p>
      </div>
    </div>
  );
} 