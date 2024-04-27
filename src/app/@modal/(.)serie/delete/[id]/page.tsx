import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';
import { SubmitButton } from '@/components/SubmitButton';
import { createSerieDatasource } from '@/data/serie';
import { cloudinaryService } from '@/lib/cloudinary';

async function serverActionToDeleteSerie(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;

  const serieDataSource = createSerieDatasource();
  const { deletedSerie } = await serieDataSource.deleteById(id);

  const promissesToDeleteAsset = [];

  if (deletedSerie.length > 0) {
    for (const character of deletedSerie) {
      if (!character.imagePublicId) continue;

      const promiseToDeleteAsset = cloudinaryService.deleteAsset(
        character.imagePublicId,
      );

      promissesToDeleteAsset.push(promiseToDeleteAsset);
    }
  }

  if (promissesToDeleteAsset.length > 0) {
    await Promise.all(promissesToDeleteAsset);
  }

  revalidatePath('/');
  redirect('/');
}

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  return (
    <Modal>
      <div className="relative flex w-64 max-w-md flex-col space-y-3 rounded-md bg-slate-50 px-4 py-2 text-center">
        Are you sure you want to delete this serie?
        <strong className="mt-2 text-xs">
          This action will delete all characters related to this serie
        </strong>
        <form action={serverActionToDeleteSerie} className="space-x-2">
          <NavigateBack className="rounded bg-red-400 px-2 text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed">
            Cancel
          </NavigateBack>

          <input type="hidden" name="id" value={params.id} />
          <SubmitButton>Confirm</SubmitButton>
        </form>
      </div>
    </Modal>
  );
}
