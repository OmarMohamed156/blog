// import React, { ReactNode, useEffect, useState } from 'react';
// import { Container, Text, Button, Paper, useMantineTheme } from '@mantine/core';
// interface ErrorBoundaryProps {
//   children: ReactNode;
//   fallback?: ReactNode;
// }

// const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     if (hasError) {
//       // You can perform any necessary cleanup or logging here
//       console.error('An error occurred within the error boundary.');
//     }
//   }, [hasError]);

//   const handleError = () => {
//     setHasError(true);
//   };

//   if (hasError) {
//     return (
//       <Container size="xl">
//         <Paper shadow="lg" style={{ textAlign: 'center' }}>
//           <Text size="xl" weight={700}>
//             Oops, something went wrong!
//           </Text>
//           <Text size="sm">
//             An error occurred while rendering this content. Please try again later.
//           </Text>
//           <Button variant="outline" onClick={handleError}>
//             Retry
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <React.Fragment>
//       {React.Children.map(children, (child) =>
//         React.cloneElement(child as React.ReactElement, {
//           onError: handleError,
//         })
//       )}
//     </React.Fragment>
//   );
// };

// export default ErrorBoundary;

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
