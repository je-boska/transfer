import Image from 'next/image';
import Link from 'next/link';
import { ArcherContainer, ArcherElement } from 'react-archer';
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
    <div className='container mx-auto p-8 mt-10'>
      <ArcherContainer
        strokeColor='lightgray'
        strokeWidth={1}
        lineStyle='straight'
        endMarker={false}
        svgContainerStyle={{ zIndex: -1 }}
      >
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <ArcherElement id='artist-name'>
              <h1 className='text-xl mb-8 inline-block'>
                {name.toUpperCase()}
              </h1>
            </ArcherElement>
            <div className='flex flex-wrap justify-evenly max-w-lg'>
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
                        <h2 className='font-bold cursor-pointer'>{title}</h2>
                      </ArcherElement>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className='relative w-full mb-8'>
            <div className='mb-4'>
              {image && (
                <Image
                  src={image.url}
                  alt={name}
                  layout='intrinsic'
                  width={image.width}
                  height={image.height}
                />
              )}
            </div>
            {bio && (
              <div className='rich-text mb-20'>
                {renderRichTextWithImages(bio)}
              </div>
            )}
          </div>
        </div>
      </ArcherContainer>
    </div>
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
