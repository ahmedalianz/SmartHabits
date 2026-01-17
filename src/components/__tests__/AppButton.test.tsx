import { fireEvent, render } from '@testing-library/react-native';
import AppButton from '../AppButton';
jest.mock('@/hooks/useAppTheme', () => () => ({
  colors: {
    primary: 'blue',
    text: 'white',
  },
}));
describe('AppButton', () => {
  it('should render correctly with theme style', () => {
    const { getByTestId } = render(
      <AppButton title="test-button" testID="test-button-id" />,
    );
    expect(getByTestId('test-button-id')).toHaveStyle({
      backgroundColor: 'blue',
    });
  });
  it('should receive a title', () => {
    const { getByText } = render(<AppButton title="test-button" />);
    expect(getByText('test-button')).toBeTruthy();
  });
  it('accepts style', () => {
    const { getByTestId } = render(
      <AppButton
        title="test-button"
        testID="test-button-id"
        containerStyle={{ backgroundColor: 'red' }}
      />,
    );
    expect(getByTestId('test-button-id')).toHaveStyle({
      backgroundColor: 'red',
    });
  });
  it('should accept text style', () => {
    const { getByTestId } = render(
      <AppButton
        title="test-button"
        testID="test-button-id"
        textStyle={{ color: 'red' }}
      />,
    );
    expect(getByTestId('test-button-id-text').props.style).toContainEqual({
      color: 'red',
    });
  });
  it('should call onPress when button is pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AppButton
        title="test-button"
        testID="test-button-id"
        onPress={onPress}
      />,
    );
    const button = getByTestId('test-button-id');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it('should be disabled when disabled prop is passed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AppButton title="test-button" testID="test-button-id" disabled />,
    );
    const button = getByTestId('test-button-id');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toHaveStyle({
      opacity: 0.6,
    });
  });
  it('should have 0.7 opacity when disabled prop is passed', () => {
    const { getByTestId } = render(
      <AppButton title="test-button" testID="test-button-id" disabled />,
    );
    const button = getByTestId('test-button-id');
    fireEvent(button, 'pressIn');
    expect(button).toHaveStyle({
      opacity: 0.6,
    });
  });
  it('should be disabled when onPress prop is not passed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AppButton title="test-button" testID="test-button-id" />,
    );
    const button = getByTestId('test-button-id');

    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
