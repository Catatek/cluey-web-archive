import { BLOCKS, INLINES } from "@contentful/rich-text-types";
export { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const renderOptions = (links) => {
  // create an asset map
  const assetMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  const entryMap = new Map();

  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }

  return {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, _) => {
        const entry = entryMap.get(node.data.target.sys.id);

        if (entry.__typename === "Post") {
          return <a href={`/blog/${entry.slug}`}>{entry.title}</a>;
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, _) => {
        const entry = entryBlockMap.get(node.data.target.sys.id);
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, _) => {
        const asset = assetMap.get(node.data.target.sys.id);

        return <img src={asset.url} alt="My image alt text" />;
      },
    },
  };
};
