import Input from '@/components/Input';
import InputMultiSelect from '@/components/InputMultiSelect';
import TextArea from '@/components/TextArea';

export default function SerieForm() {
  return (
    <form className="space-y-4">
      <Input id="name" name="name" placeholder="Name" required />
      <TextArea
        required
        id="description"
        name="description"
        placeholder="Description"
      />
      <div className="flex gap-2">
        <Input
          required
          id="episodes"
          type="number"
          name="episodes"
          placeholder="Episodes"
        />
        <Input
          required
          id="seasons"
          type="number"
          name="seasons"
          placeholder="Seasons"
        />
      </div>
      <InputMultiSelect
        id="platforms"
        name="platforms"
        placeholder="Available platforms"
      />
      <fieldset className="space-x-2">
        <label htmlFor="status">Status</label>
        <select
          required
          id="status"
          name="status"
          className="rounded-md outline-none"
        >
          <option value=""></option>
          <option value="FINISHED">FINISHED</option>
          <option value="CANCELED">CANCELED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
        </select>
      </fieldset>

      <button
        type="submit"
        className="bottom-5 right-10 mt-10 w-full rounded-md bg-slate-600 p-2 text-white md:absolute md:w-fit"
      >
        Register
      </button>
    </form>
  );
}
