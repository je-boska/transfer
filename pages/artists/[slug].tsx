import Image from 'next/image';
import Link from 'next/link';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Meta from '../../components/Meta';
import { getArtistPageSingle } from '../../lib/contentful/pages/artist';
import { getArtistPathsToPreRender } from '../../lib/contentful/paths';
import { renderRichTextWithImages } from '../../lib/rich-text';
import { ArtistType, Asset } from '../../types/shared';

interface ArtistProps {
  artist: ArtistType;
  image: Asset;
}

export default function Artist({ artist, image }: ArtistProps) {
  const { name, bio, linkedFrom } = artist;

  return (
    <>
      <Meta title={name + ' | TRANSFER'} />
      <div className='container mx-auto p-8 mt-10'>
        <ArcherContainer
          strokeColor='lightgray'
          strokeWidth={1}
          lineStyle='straight'
          endMarker={false}
          svgContainerStyle={{ zIndex: -1 }}
        >
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='order-1 md:order-0'>
              <ArcherElement id='artist-name'>
                <h1 className='text-xl mb-8 inline-block'>
                  {name.toUpperCase()}
                </h1>
              </ArcherElement>
              <div className='flex flex-wrap justify-evenly max-w-lg max-h-[50vh] mb-20'>
                {linkedFrom.articleCollection.items.map(
                  ({ title, slug }, idx) => (
                    <Link key={idx} href={`/articles/${slug}`} passHref>
                      <div className='item'>
                        <ArcherElement
                          id={`item${idx}`}
                          relations={[
                            {
                              targetId: 'artist-name',
                              targetAnchor: 'bottom',
                              sourceAnchor: 'middle',
                            },
                          ]}
                        >
                          <h2 className='font-bold cursor-link hover:italic'>
                            {title}
                          </h2>
                        </ArcherElement>
                      </div>
                    </Link>
                  )
                )}
              </div>
              {bio && (
                <div className='rich-text mb-20 max-w-lg'>
                  {renderRichTextWithImages(bio)}
                </div>
              )}
            </div>
            <div className='order-0 md:order-1 relative w-full mb-8'>
              <div className='mb-4'>
                {image && (
                  <Image
                    src={image.url}
                    alt={name}
                    layout='intrinsic'
                    width={image.width}
                    height={image.height}
                    quality={50}
                  />
                )}
              </div>
            </div>
          </div>
        </ArcherContainer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getArtistPathsToPreRender();

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ locale, params }: any) {
  const { artist, image } = await getArtistPageSingle(params.slug, locale);

  return {
    props: { artist, image },
    revalidate: 60 * 60,
  };
}
