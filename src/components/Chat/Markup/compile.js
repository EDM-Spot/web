import React from 'react';
import Bold from './Bold';
import Code from './Code';
import Italic from './Italic';
import StrikeThrough from './StrikeThrough';
import Mention from './Mention';
import GroupMention from './GroupMention';
import Img from './Img';
import Link from './Link';
import Emoji from './Emoji';

export default function compile(tree, opts = {}) {
  const {
    availableEmoji = [],
    emojiImages = {},
  } = opts;

  const imgRx = new RegExp('^([a-z-_0-9/:.]*.(jpg|jpeg|png|gif))', 'i');

  return tree.map((node, i) => {
    if (typeof node === 'string') {
      return node;
    }

    const match = imgRx.exec(node.href);

    /* eslint-disable react/no-array-index-key */
    switch (node.type) {
      case 'mention':
        return node.user
          ? <Mention key={i} user={node.user} />
          : <GroupMention key={i} group={node.mention} users={node.group} />;
      case 'link':
        if (match) {
          return <Img key={i} href={node.href} />;
        }
        return <Link key={i} href={node.href}>{node.text}</Link>;
      case 'emoji':
        if (availableEmoji.includes(node.name) && node.name in emojiImages) {
          return (
            <Emoji
              key={i}
              name={node.name}
              image={emojiImages[node.name]}
            />
          );
        }
        return `:${node.name}:`;
      case 'italic':
        return <Italic key={i}>{compile(node.content, opts)}</Italic>;
      case 'bold':
        return <Bold key={i}>{compile(node.content, opts)}</Bold>;
      case 'code':
        return <Code key={i}>{compile(node.content, opts)}</Code>;
      case 'strike':
        return <StrikeThrough key={i}>{compile(node.content, opts)}</StrikeThrough>;
      default:
        return compile(node.content, opts);
    }
    /* eslint-enable react/no-array-index-key */
  });
}
