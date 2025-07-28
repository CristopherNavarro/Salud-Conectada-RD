export async function handleAppointmentSubmission(prevState: any, data: any) { // Changed to accept data object
  try {
    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly
    });

    if (response.ok) {
      return { message: '¡Gracias! Tu cita ha sido registrada.', status: 'success' };
    } else {
      return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting appointment form:', error);
    return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleVolunteerSubmission(prevState: any, data: any) { // Changed to accept data object

  try {
    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/voluntarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly
    });

    if (response.ok) {
      return { message: '¡Gracias por tu interés! Hemos recibido tu información.', status: 'success' };
    } else {
      return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleDonationSubmission(prevState: any, data: any) { // Changed to accept data object

  try {
    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/donaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Sending the data object directly including email
    });

    if (response.ok) {
      return { message: '¡Gracias por tu donación!', status: 'success' };
    } else {
      return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
  }
}

// AÑADIDO: Nueva función para manejar el envío de mensajes del chatbot
export async function handleChatSubmission(message: string): Promise<string> {
  try {
    const response = await fetch('https://monkey-adapting-cub.ngrok-free.app/webhook/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Asegúrate de que el cuerpo del mensaje coincida con lo que espera tu webhook de N8N.
      // Aquí asumimos que espera un objeto con una propiedad "message".
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Asumimos que la respuesta de N8N es un JSON con una propiedad "reply" que contiene el texto del bot.
    // Ajusta "reply" al nombre de la propiedad correcta que devuelve tu flujo de trabajo.
    if (result && result.reply) {
      return result.reply;
    } else {
      // Si la respuesta no tiene el formato esperado, devuelve un mensaje genérico.
      return "He recibido tu mensaje, pero no pude procesar una respuesta.";
    }

  } catch (error) {
    console.error('Error submitting chat message:', error);
    // Devuelve un mensaje de error genérico para mostrar en la interfaz de chat.
    return "No se pudo conectar con el asistente. Por favor, inténtalo más tarde.";
  }
}
