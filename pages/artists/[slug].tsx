import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { getArtistPageSingle } from "../../lib/contentful/pages/artist";
import { getArtistPathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArtistType, Asset } from "../../types/shared";

interface ArtistProps {
  artist: ArtistType;
  image: Asset;
}

export default function Artist({ artist, image }: ArtistProps) {
  const { name, bio, linkedFrom } = artist;

  return (
    <div className="container p-8 mt-10">
      <div className="text-3xl mb-8">{name}</div>
      <div className="relative w-full h-96 mb-8">
        <Image src={image.url} alt={name} layout="fill" objectFit="cover" />
      </div>
      {bio && (
        <div className="rich-text mb-20">{renderRichTextWithImages(bio)}</div>
      )}
      {linkedFrom.articleCollection.items.map(({ title, slug }, idx) => (
        <Link key={idx} href={`/articles/${slug}`} passHref>
          <div className="cursor-pointer font-bold">
            <h2>{title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getArtistPathsToPreRender();

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ locale, params }: any) {
  const { artist, image } = await getArtistPageSingle(params.slug, locale);

  return {
    props: {
      artist,
      image,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 60,
  };
}
