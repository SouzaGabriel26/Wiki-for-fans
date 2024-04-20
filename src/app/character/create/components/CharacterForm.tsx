import InputMultiSelect from '@/components/InputMultiSelect';

export default async function CharacterForm() {
  return (
    <form>
      <InputMultiSelect
        id="personalities"
        name="personalities"
        placeholder="Personalities"
      />
    </form>
  );
}
