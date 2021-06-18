import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  containerClass = ''
}) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm rounded-2xl', {
        'hover:shadow-md transition-shadow duration-200': slug
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  );
  return (
    <div className={`${containerClass} sm:mx-0`}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        <div className={containerClass}>{image}</div>
      )}
    </div>
  );
}
