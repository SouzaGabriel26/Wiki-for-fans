import { CreateSerieArgs } from '@/app/api/configs/context/prismaMutations';
import Input from '@/components/Input';
import { MultiInput } from '@/components/MultiInput';
import { SubmitButton } from '@/components/SubmitButton';
import TextArea from '@/components/TextArea';

type SerieFormProps = {
  isEdit?: boolean;
  serie?: CreateSerieArgs;
  action: (formData: FormData) => Promise<void>;
};

export default async function SerieForm({
  isEdit = false,
  serie,
  action,
}: SerieFormProps) {
  if (!isEdit && serie) {
    throw new Error(
      '> SerieForm: To use this component in edit mode, you must provide a character.',
    );
  }

  return (
    <form key={new Date().toISOString()} className="space-y-4" action={action}>
      <Input
        id="name"
        name="name"
        placeholder="Name"
        required
        defaultValue={serie?.name}
      />
      <TextArea
        required
        id="description"
        name="description"
        placeholder="Description"
        defaultValue={serie?.description}
      />
      <div className="flex gap-2">
        <Input
          required
          id="episodes"
          type="number"
          name="episodes"
          placeholder="Episodes"
          defaultValue={serie?.episodes}
        />
        <Input
          required
          id="seasons"
          type="number"
          name="seasons"
          placeholder="Seasons"
          defaultValue={serie?.seasons}
        />
      </div>
      <MultiInput
        id="platforms"
        name="platforms"
        placeholder="Available platforms"
        defaultOptions={serie?.platforms}
      />
      <fieldset className="space-x-2">
        <label htmlFor="status">Status</label>
        <select
          required
          id="status"
          name="status"
          className="rounded-md outline-none"
          defaultValue={serie?.status}
        >
          <option value=""></option>
          <option value="FINISHED">FINISHED</option>
          <option value="CANCELED">CANCELED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
        </select>
      </fieldset>

      <SubmitButton className="bottom-5 right-10 py-2 md:absolute">
        {isEdit ? 'Save' : 'Register'}
      </SubmitButton>
    </form>
  );
}
