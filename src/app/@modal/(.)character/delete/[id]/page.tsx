import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';
import { createCharacterDatasource } from '@/data/character';
import { cloudinaryService } from '@/lib/cloudinary';

async function serverActionToDeleteCharacter(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;

  const characterDataSource = createCharacterDatasource();
  const { deletedCharacter } = await characterDataSource.deleteById(id);

  if (deletedCharacter.imagePublicId && deletedCharacter.image) {
    await cloudinaryService.deleteAsset(deletedCharacter.imagePublicId);
  }

  revalidatePath('/');
  return redirect(`/?serieId=${deletedCharacter.serie.id}`);
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  return (
    <Modal>
      <div className="relative flex w-64 max-w-md flex-col space-y-3 rounded-md bg-slate-50 px-4 py-2 text-center">
        <p>Are you sure you want to delete this character?</p>

        <div className="flex items-center justify-center gap-4">
          <NavigateBack className="rounded bg-red-400 px-2 text-white transition-colors hover:bg-red-500">
            Cancel
          </NavigateBack>

          <form action={serverActionToDeleteCharacter}>
            <input type="hidden" name="id" value={id} />
            <button className="cursor-pointer rounded bg-blue-400 px-2 text-white transition-colors hover:bg-blue-500">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
