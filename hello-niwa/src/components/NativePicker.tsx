import { Picker } from '@react-native-picker/picker';

export default function NativePicker({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Picker selectedValue={value} onValueChange={onChange}>
      <Picker.Item label="2025/12/22" value="2025/12/22" />
      <Picker.Item label="2025/12/23" value="2025/12/23" />
    </Picker>
  );
}
