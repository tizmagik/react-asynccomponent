import React, { Component, ComponentType } from 'react';

type DynamicImport = () => Promise<{
  default: ComponentType;
}>;

type State<ComponentType> = {
  component?: ComponentType;
};

function asyncComponent(importComponent: DynamicImport): ComponentType {
  class AsyncComponent extends Component {
    state: State<ComponentType> = {};

    private mounted = false;

    async componentDidMount() {
      this.mounted = true;

      try {
        const { default: component } = await importComponent();

        if (this.mounted) {
          this.setState({ component });
        }
      } catch (e) {
        console.log(e);
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      if (this.state.component) {
        return <this.state.component {...this.props} />;
      }

      return null;
    }
  }

  return AsyncComponent;
}

export default asyncComponent;
