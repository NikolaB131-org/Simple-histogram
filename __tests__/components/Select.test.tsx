import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select, { Props } from '@/components/Select';

describe('Select', () => {
  let props: Props;
  const onSelectMock = jest.fn();

  beforeEach(() => {
    props = {
      width: 250,
      items: [
        { key: 'first_item', value: 'First item text' },
        { key: 'second_item', value: 'Second item text' },
        { key: 'third_item', value: 'Third item text' },
      ],
      defaultItem: 'second_item',
      onSelect: onSelectMock,
    };
  });

  test('рендерится правильно', () => {
    render(<Select {...props} />)

    const firstTextElement = screen.getByText('First item text');
    const secondTextElement = screen.getByText('Second item text');
    const thirdTextElement = screen.getByText('Third item text');
    expect(secondTextElement).toBeInTheDocument();
    expect(firstTextElement).toBeInTheDocument();
    expect(thirdTextElement).toBeInTheDocument();
  });

  test('выбор опции изменяет текст кнопки и вызывает callback onSelect', async () => {
    render(<Select {...props} />)
    const buttonTextElement = screen.getByRole('button').firstElementChild;

    const firstTextElement = screen.getByText('First item text');
    await userEvent.click(firstTextElement);
    expect(buttonTextElement?.innerHTML).toBe('First item text'); // проверка текста на кнопке
    expect(onSelectMock).toBeCalledWith('first_item');

    const thirdTextElement = screen.getByText('Third item text');
    await userEvent.click(thirdTextElement);
    expect(buttonTextElement?.innerHTML).toBe('Third item text'); // проверка текста на кнопке
    expect(onSelectMock).toBeCalledWith('third_item');
  });
});
