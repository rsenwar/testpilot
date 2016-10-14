import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import ExperimentCardList from '../../../src/app/components/ExperimentCardList';


describe('app/components/ExperimentCardList', () => {
  let props, subject;
  beforeEach(() => {
    props = {
      experiments: [
        { slug: 'foo' },
        { slug: 'bat' }
      ],
      isExperimentEnabled: sinon.spy(() => false),
      // required by ExperimentRowCard {...this.props}
      hasAddon: true,
      eventCategory: 'test category',
      getExperimentLastSeen: sinon.spy(),
      sendToGA: sinon.spy(),
      navigateTo: sinon.spy()
    };
    subject = shallow(<ExperimentCardList {...props} />);
  });

  it('renders a loading screen if no experiments are available', () => {
    subject.setProps({ experiments: [] });
    expect(subject.find('Loading')).to.have.property('length', 1);
  });

  it('renders ExperimentRowCards for each experiment', () => {
    expect(subject.find('ExperimentRowCard')).to.have.length(props.experiments.length);
  });

  it('respects an exception if specified', () => {
    subject.setProps({ except: props.experiments[0].slug });
    expect(subject.find('ExperimentRowCard')).to.have.length(props.experiments.length - 1);
  });
});
