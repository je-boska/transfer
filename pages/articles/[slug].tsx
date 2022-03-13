import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { getArticlePageSingle } from '../../lib/contentful/pages/article';
import { getArticlePathsToPreRender } from '../../lib/contentful/paths';
import { renderRichTextWithImages } from '../../lib/rich-text';
import { ArticleType, Asset } from '../../types/shared';

interface ArticleProps {
  article: ArticleType;
  media: Asset[];
}

export default function Article({ article, media }: ArticleProps) {
  const { title, videoLink, content, artistsCollection } = article;

  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 lg:w-2/3 md:h-screen md:overflow-scroll p-4 pt-16 lg:p-8 lg:pt-16 border-r md:border-black'>
          <article className='max-w-xl mx-auto'>
            <h1 className='text-xl mb-2'>{title.toUpperCase()}</h1>
            <div className='mb-12'>
              {artistsCollection.items.map(({ name, slug }, idx) => (
                <p key={idx} className='font-bold text-right'>
                  <Link href={`/artists/${slug}`} passHref>
                    <span className='cursor-pointer'>{name}</span>
                  </Link>
                </p>
              ))}
            </div>
            <div className='rich-text mb-20'>
              {content && renderRichTextWithImages(content)}
            </div>
          </article>
        </div>
        <div className='md:w-1/2 lg:w-1/3 md:h-screen md:overflow-y-scroll'>
          {videoLink && (
            <div className='relative w-full pt-[56.25%]'>
              <ReactPlayer
                width='100%'
                height='100%'
                className='absolute top-0 left-0'
                controls
                url={videoLink}
              />
            </div>
          )}
          {media.map(({ url, width, height, contentType }, idx) => {
            if (contentType.includes('image')) {
              return (
                <div key={idx} className='relative'>
                  <Image
                    src={url}
                    alt={title}
                    layout='responsive'
                    width={width}
                    height={height}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getArticlePathsToPreRender();

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ locale, params }: any) {
  const { article, media } = await getArticlePageSingle(params.slug, locale);

  return {
    props: {
      article,
      media,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60 * 60,
  };
}
