import AppText from '../AppText';
import { render } from '@testing-library/react-native';

jest.mock('@/hooks/useAppTheme', () => ({
  __esModule: true,
  default: () => ({
    name: 'light',
    colors: { text: '#000000' },
  }),
}));

describe('AppText', () => {
  it('should render correctly', () => {
    const { getByText } = render(<AppText>Test</AppText>);
    expect(getByText('Test')).toBeTruthy();
  });
  it('should accept test id', () => {
    const { getByTestId } = render(<AppText testID="test-id">Test</AppText>);
    expect(getByTestId('test-id')).toBeTruthy();
  });
  it('should accept style', () => {
    const { getByText } = render(
      <AppText style={{ color: 'red' }}>Test</AppText>,
    );
    expect(getByText('Test').props.style).toContainEqual({ color: 'red' });
  });
});
