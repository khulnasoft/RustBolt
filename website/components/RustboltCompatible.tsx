import axios from 'axios';
import { useEffect, useState } from 'react';
import './CompatibleCard.scss';

interface CardMeta {
  name: string;
  url: string;
  rustboltMinVersion: string;
  remark?: string;
}

const CompatibleCardItem = ({
  name,
  url,
  remark,
  rustboltMinVersion,
}: CardMeta) => {
  return (
    <div className="component-card">
      <div className="component-card-title-line">
        <a
          className="component-card-link"
          target="_blank"
          rel="noreferrer"
          href={url}
        >
          {name}
        </a>
        <div className="component-card-space" />
        <div className="component-card-status">{rustboltMinVersion}</div>
      </div>
      {remark && <div>{remark}</div>}
    </div>
  );
};

interface RustboltCompatItem {
  name: string;
  version: string;
  rustboltVersion: string;
  path: string;
}

export const CompatibleCardList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<RustboltCompatItem[]>([]);

  useEffect(() => {
    const url =
      'https://raw.githubusercontent.com/khulnasoft/rustbolt-compat/data/rustbolt-compat.json';
    setLoading(true);
    axios.get<RustboltCompatItem[]>(url).then(res => {
      const data = res.data.slice();
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
      setList(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div />;
  }

  const prefix = 'https://github.com/khulnasoft/rustbolt-compat/tree/main';
  return list.map(item => (
    <CompatibleCardItem
      key={item.path}
      name={`${item.name}@${item.version}`}
      url={`${prefix}/${item.path}`}
      rustboltMinVersion={item.rustboltVersion}
    />
  ));
};
