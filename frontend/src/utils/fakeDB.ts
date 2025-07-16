// utils/fakeDB.ts
export const setupFakeDB = () => {
  if (!localStorage.getItem("usuarios")) {
    const usuarios = [
      {
        _id: "u1",
        name: "Admin Test",
        email: "admin@mail.com",
        password: "admin123",
        role: "admin",
      },
      {
        _id: "u2",
        name: "Usuario Test",
        email: "user@mail.com",
        password: "user123",
        role: "user",
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  if (!localStorage.getItem("salas")) {
    const salas = [
      {
        roomId: "sala123",
        name: "Sprint 5",
        participants: ["u1", "u2"],
        messages: [],
      },
    ];
    localStorage.setItem("salas", JSON.stringify(salas));
  }
};
