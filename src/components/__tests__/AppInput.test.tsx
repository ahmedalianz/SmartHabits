import { fireEvent, render } from '@testing-library/react-native';
import AppInput from '../AppInput';
jest.mock('@/hooks/useAppTheme', () => () => ({
  colors: {
    card: 'blue',
    text: 'white',
    danger: 'red',
  },
}));
describe('AppInput', () => {
  it('should render correctly with theme style', () => {
    const { getByTestId } = render(<AppInput testID="test-input-container" />);
    expect(getByTestId('test-input-container')).toHaveStyle({
      marginBottom: 20,
    });
  });
  it('should receive a label', () => {
    const { getByText } = render(<AppInput label="test-label" />);
    expect(getByText('test-label')).toBeTruthy();
  });
  it('accepts style', () => {
    const { getByTestId } = render(
      <AppInput
        testID="test-input-container"
        containerStyle={{ backgroundColor: 'red' }}
      />,
    );
    expect(getByTestId('test-input-container')).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('should call onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <AppInput testID="email" onChangeText={onChangeText} />,
    );
    const input = getByTestId('email-input');
    fireEvent.changeText(input, 'new text');
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });
  it('passes props to TextInput', () => {
    const { getByTestId } = render(
      <AppInput testID="email" placeholder="Email" />,
    );
    expect(getByTestId('email-input').props.placeholder).toBe('Email');
  });

  it('should call onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(<AppInput testID="email" onBlur={onBlur} />);
    const input = getByTestId('email-input');
    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalled();
  });
  it('should show error when input is touched and error is received', () => {
    const { getByText } = render(<AppInput error="test-error" touched />);
    expect(getByText('test-error')).toBeTruthy();
    expect(getByText('test-error')).toHaveStyle({
      color: 'red',
    });
  });

  it('should not show error when input is not touched', () => {
    const { queryByText } = render(<AppInput error="test-error" />);
    expect(queryByText('test-error')).toBeNull();
  });
  it('should not show error when error is not received', () => {
    const { queryByText } = render(<AppInput touched />);
    expect(queryByText('test-error')).toBeNull();
  });

  it('should accept password & when toggled it show show hide word instead of show', () => {
    const { getByTestId } = render(<AppInput testID="password" secure />);
    const input = getByTestId('password-input');
    expect(input.props.secureTextEntry).toBe(true);
    expect(getByTestId('password-toggle')).toBeTruthy();
    const toggleButton = getByTestId('password-toggle-eye');
    expect(toggleButton.props.children).toBe('Show');
    fireEvent.press(toggleButton);
    expect(toggleButton.props.children).toBe('Hide');
    fireEvent.press(toggleButton);
    expect(input.props.secureTextEntry).toBe(true);
    expect(getByTestId('password-toggle-eye').props.children).toBe('Show');
  });

  it('should maintain password visibility state across re-renders', () => {
    const { getByTestId, rerender } = render(
      <AppInput testID="password" secure value="" />,
    );
    const toggleButton = getByTestId('password-toggle');

    fireEvent.press(toggleButton);
    expect(getByTestId('password-input').props.secureTextEntry).toBe(false);

    rerender(<AppInput testID="password" secure value="new value" />);

    expect(getByTestId('password-input').props.secureTextEntry).toBe(false);
  });
});
