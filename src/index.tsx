import React, { Component, ComponentType } from 'react';

type DynamicImport = () => Promise<{
  default: ComponentType;
}>;

type State<ComponentType> = {
  component?: ComponentType;
};

export type AsyncComponentOptions = {
  /** Function will be called if there's an error while running the dynamic import */
  onError?: (e: unknown) => void;

  /** Function called upon successfully loading.  */
  onLoaded?: (c: ComponentType) => void;

  /** Component to render if there was an error. */
  ErrorComponent?: ComponentType;

  /** Component to render while loading. */
  Loading?: ComponentType;
};

function asyncComponent(
  importComponent: DynamicImport,
  options: AsyncComponentOptions = {}
): ComponentType {
  class AsyncComponent extends Component {
    state: State<ComponentType> = {};

    private mounted = false;

    async componentDidMount() {
      this.mounted = true;

      try {
        const { default: component } = await importComponent();

        if (this.mounted) {
          options.onLoaded?.(component);
          this.setState({ component });
        }
      } catch (e) {
        if (this.mounted) {
          options.onError?.(e);

          // fallback to ErrorComponent
          this.setState({ component: options.ErrorComponent });
        }
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      if (this.state.component) {
        return <this.state.component {...this.props} />;
      }

      if (options.Loading) {
        return <options.Loading {...this.props} />;
      }

      return null;
    }
  }

  return AsyncComponent;
}

export default asyncComponent;
