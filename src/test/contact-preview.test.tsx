import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/corporate/sections';

afterEach(() => vi.restoreAllMocks());
describe('Static contact form', () => {
  it('does not transmit or store a submitted message', () => {
    const network = vi.spyOn(globalThis, 'fetch');
    const storage = vi.spyOn(Storage.prototype, 'setItem');
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Preview Tester' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'tester@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Business enquiry' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }).closest('form') as HTMLFormElement);
    expect(network).toHaveBeenCalledTimes(0);
    expect(storage).toHaveBeenCalledTimes(0);
  });
});