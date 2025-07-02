export default function registerChatSocket(io, socket) {
  // Mensaje Recibido
  socket.on('chat:message', (data) => {
    console.log('Mensaje recibido:', data)

    
    
    // Enviar el mensaje a todos los miembros de la sala
    io.emit('chat:message', {
      ...data,
      timestamp: new Date().toISOString()
    })
  })

  // Desconección
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
}
