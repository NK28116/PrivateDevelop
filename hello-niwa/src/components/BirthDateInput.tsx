
import { useWindowDimensions ,Platform} from 'react-native';
import NativePicker from './NativePicker';
import WheelPicker from './WheelPicker';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const BirthDateInput: React.FC<Props> = ({ value, onChange }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (Platform.OS !== 'web') {
    return <NativePicker value={value} onChange={onChange} />;
  }

  if (isMobile) {
    return (
      <WheelPicker
        dataset={['2025/12/22', '2025/12/23']}
        initialValue={value}
        onConfirm={onChange}
      />
    );
  }

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="2025/12/22">2025/12/22</option>
      <option value="2025/12/23">2025/12/23</option>
    </select>
  );
};

export default BirthDateInput;
