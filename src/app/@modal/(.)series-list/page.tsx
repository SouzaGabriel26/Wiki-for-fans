import Link from 'next/link';

import { CloseModalIcon } from '@/components/CloseModalIcon';
import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';
import { createSerieDatasource } from '@/data/serie';

export default async function SeriesListModal() {
  const seriesDatasource = createSerieDatasource();
  const { returnedSeries: series } = await seriesDatasource.getAll();

  return (
    <Modal>
      <NavigateBack className="absolute right-4 text-slate-800">
        <CloseModalIcon />
      </NavigateBack>

      {series.map((serie) => (
        <Link
          key={serie.id}
          href={{
            pathname: '/',
            query: { serieId: serie.id },
          }}
          className="text-slate-800 transition-colors hover:text-slate-900"
        >
          {serie.name}
        </Link>
      ))}
    </Modal>
  );
}
