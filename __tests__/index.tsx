import { render, screen } from '@testing-library/react'
import Home from '@/pages'
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { dataPages } from "@/shared/dataPages"
jest.mock("next-auth/react");

describe.skip("Home Component", () => {
  it('Show All dataPages info when has session and user rol is Admin',
    async () => {
      const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { id_rol: 1 }
      };
      (useSession as jest.Mock).mockReturnValueOnce([mockSession, 'authenticated']);
      render(<Home Seccion={mockSession} props={null} />);

      dataPages.map((page) => {
        expect(screen.getByText(page.description)).toBeInTheDocument();
      })
    })

  it('Show All dataPages info when has session and user rol is User',
    async () => {
      const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { id_rol: 2 }
      };
      (useSession as jest.Mock).mockReturnValueOnce([mockSession, 'authenticated']);
      render(<Home Seccion={mockSession} props={null} />);

      dataPages.map((page) => {
        if (page.userRol.rol == "user") {
          expect(screen.getByText(page.description)).toBeInTheDocument();
        }
      })
    })

  it('Should no watch the datpage when hasnt session',
    async () => {
      render(<Home Seccion={null} props={null} />);

      const links = screen.queryAllByRole('link');
      expect(links).toHaveLength(0);
    })
})