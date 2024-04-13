import Link from 'next/link';

import Modal from '@/components/Modal';
import { createSerieDatasource } from '@/data/serie';

export default async function SeriesListModal() {
  const seriesDatasource = createSerieDatasource();
  const { returnedSeries: series } = await seriesDatasource.getAll();

  return (
    <Modal>
      <div className="relative flex w-64 max-w-md flex-col space-y-3 rounded-md bg-slate-50 px-4 py-2 text-center">
        <Link href="/" className="absolute right-4 text-slate-800">
          ❌{/* TODO - create `close button component ( use router.back() )` */}
        </Link>

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
      </div>
    </Modal>
  );
}
