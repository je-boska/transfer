import Image from 'next/image';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { getArticlePageSingle } from '../../lib/contentful/pages/article';
import { getArticlePathsToPreRender } from '../../lib/contentful/paths';
import { renderRichTextWithImages } from '../../lib/rich-text';
import { ArticleType } from '../../types/shared';

interface ArticleProps {
  article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
  const { title, videoLink, content, mediaCollection, artistsCollection } =
    article;

  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 lg:w-[60%] md:h-screen md:overflow-scroll p-4 pt-16 border-r md:border-black'>
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
        <div className='md:w-1/2 lg:w-[40%] md:h-screen md:overflow-y-scroll'>
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
          {mediaCollection &&
            mediaCollection.items.map(
              ({ url, width, height, contentType }, idx) => {
                if (contentType.includes('image')) {
                  return (
                    <div key={idx} className='relative cursor-pointer'>
                      <Link href={url} passHref>
                        <a target='_blank'>
                          <Image
                            src={url}
                            alt={title}
                            layout='responsive'
                            width={width}
                            height={height}
                          />
                        </a>
                      </Link>
                    </div>
                  );
                }
              }
            )}
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
  const { article } = await getArticlePageSingle(params.slug, locale);

  return {
    props: {
      article,
    },
    revalidate: 60 * 60,
  };
}
