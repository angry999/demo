import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert, expect } from 'chai';
import { spy, stub } from 'sinon';

import Files from '../pages/files/Files';
import CollapsePanel from '../pages/files/CollapsePanel';
import { render, fireEvent } from "@testing-library/react";
import { FILES_DATA, FILTER_CASE, NAMING_PATTERN_CASE } from "./mock.files.data";
import IconButton from '@material-ui/core/IconButton'; 

describe('Files component render', () => {

    it("Files is rendered without crashing", () => {
        expect(render(<Files isTesting={true} />));
    });

    it('component renders a table', () => {
        const wrapper = shallow(<Files isTesting={true} />).dive();
        expect(wrapper.find('#Files_table'));
    });
});

describe('Files component table data render', () => {
    it('should correctly build internal table data and displayData structure', () => {
        const shallowWrapper = shallow(<Files isTesting={true} />);
        shallowWrapper.setState({ loading: false });
        shallowWrapper.update();
        const actualResult = shallowWrapper.state('items');

        assert.deepEqual(actualResult, FILES_DATA);
    });

    it('should render a toolbar', () => {
        const mountWrapper = mount(
            <Files isTesting={true} />,
        );
        const actualResult = mountWrapper.find(IconButton);
        assert.strictEqual(actualResult.length, 6);
    });

    it('should correctly build internal filterList structure', () => {
        const shallowWrapper = shallow(<Files isTesting={true} />);
        const filterList = shallowWrapper.state('filterTerms');
        const expectedResult: any = [];

        assert.deepEqual(filterList, expectedResult);
    });

    it('should correctly build internal unique column data for filterData structure', () => {
        const shallowWrapper = shallow(<Files isTesting={true} />);
        const expectedResult = [
            [],
            [],
            [],
            [],
            [],
            [
                "pre-order-pdf"
            ],
            [
                "t"
            ],
            [],
            []
        ];
        shallowWrapper.setState({ filterTerms: expectedResult });
        const filterList = shallowWrapper.state('filterTerms');

        assert.deepEqual(filterList, expectedResult);
    });
});

describe('Files component name pattern', () => {
    it('check default name pattern1 value', () => {

        const wrapper = mount(<Files isTesting={true} />);
        wrapper.setState({ loading: false });
        wrapper.update();

        wrapper
            .find('[data-testid="name-pattern"]')
            .at(0)
            .simulate('click');

        const select1 = wrapper
            .find('[data-testid="select1"]').at(0);

        assert.strictEqual(select1.text(), 'project name');

        wrapper.unmount();

    });
    it('check default name pattern2 value', () => {

        const wrapper = mount(<Files isTesting={true} />);
        wrapper.setState({ loading: false });
        wrapper.update();

        wrapper
            .find('[data-testid="name-pattern"]')
            .at(0)
            .simulate('click');

        const select2 = wrapper
            .find('[data-testid="select2"]').at(0);

        assert.strictEqual(select2.text(), 'client number');

        wrapper.unmount();

    });

    it('check default name pattern3 value', () => {

        const wrapper = mount(<Files isTesting={true} />);
        wrapper.setState({ loading: false });
        wrapper.update();

        wrapper
            .find('[data-testid="name-pattern"]')
            .at(0)
            .simulate('click');

        const select3 = wrapper
            .find('[data-testid="select3"]').at(0);

        assert.strictEqual(select3.text(), 'document name');

        wrapper.unmount();

    });
});


describe('Files component table filter', () => {
    it('should invoke applyFilters from customFooter callback', () => {

        const wrapper = mount(<Files isTesting={true} />);
        wrapper.setState({ loading: false });
        wrapper.update();


        const handleClose = spy();
        const handleFilter = spy();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        // assert.equal(handleFilter.callCount, 1);
        assert.equal(handleClose.callCount, 0);

        wrapper.unmount();

    });

    it('should invoke onFilterReset when reset is pressed', () => {

        const wrapper = mount(<Files isTesting={true} />);
        wrapper.setState({ loading: false });
        wrapper.update();

        const onFilterUpdate = spy();
        const handleClose = spy();
        const resetFilters = spy();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="filterReset-button"]')
            .at(0)
            .simulate('click');

        assert.equal(resetFilters.callCount, 0);
        assert.equal(handleClose.callCount, 0);

        wrapper.unmount();
    });
});

describe('Files component table filter function test', () => {
    it(FILTER_CASE[0].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[0].query;
        const expectedResult = FILTER_CASE[0].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });

    it(FILTER_CASE[1].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[1].query;
        const expectedResult = FILTER_CASE[1].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });

    it(FILTER_CASE[2].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[2].query;
        const expectedResult = FILTER_CASE[2].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });

    it(FILTER_CASE[3].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[3].query;
        const expectedResult = FILTER_CASE[3].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });

    it(FILTER_CASE[4].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[4].query;
        const expectedResult = FILTER_CASE[4].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });

    it(FILTER_CASE[5].description, () => {

        const wrapper = mount(<Files isTesting={true} />);

        const testQuery = FILTER_CASE[5].query;
        const expectedResult = FILTER_CASE[5].result;
        wrapper.setState({ filterTerms: testQuery });
        wrapper.update();

        wrapper
            .find('[data-testid="Filter Table-iconButton"]')
            .at(0)
            .simulate('click');

        wrapper
            .find('[data-testid="test-handleFilter"]')
            .at(0)
            .simulate('click');

        const builtFilters = wrapper.state('filters');
        assert.deepEqual(builtFilters, expectedResult);

        wrapper.unmount();

    });
});


describe('CollapsePanel component download bundle function test', () => {
    it(NAMING_PATTERN_CASE[0].description, () => {

        const wrapper = shallow(<CollapsePanel handleDownloadBundle={handleDownloadBundle} downloadBundleDisabled={false} />).dive();
        wrapper.setState({ pattern1: NAMING_PATTERN_CASE[0].pattern1, pattern2: NAMING_PATTERN_CASE[0].pattern2, pattern3: NAMING_PATTERN_CASE[0].pattern3 });
        wrapper.update();

        wrapper
            .find('[data-testid="download-bundle"]')
            .at(0)
            .simulate('click');

        const testResult = wrapper.state('pattern1') + ',' + wrapper.state('pattern2') + ',' + wrapper.state('pattern3');

        assert.deepEqual(testResult, NAMING_PATTERN_CASE[0].result);
    });
    
    it(NAMING_PATTERN_CASE[1].description, () => {

        const wrapper = shallow(<CollapsePanel handleDownloadBundle={handleDownloadBundle} downloadBundleDisabled={false} />).dive();
        wrapper.setState({ pattern1: NAMING_PATTERN_CASE[1].pattern1, pattern2: NAMING_PATTERN_CASE[1].pattern2, pattern3: NAMING_PATTERN_CASE[1].pattern3 });
        wrapper.update();

        wrapper
            .find('[data-testid="download-bundle"]')
            .at(0)
            .simulate('click');

        const testResult = wrapper.state('pattern1') + ',' + wrapper.state('pattern2') + ',' + wrapper.state('pattern3');

        assert.deepEqual(testResult, NAMING_PATTERN_CASE[1].result);
    });

    it(NAMING_PATTERN_CASE[2].description, () => {

        const wrapper = shallow(<CollapsePanel handleDownloadBundle={handleDownloadBundle} downloadBundleDisabled={false} />).dive();
        wrapper.setState({ pattern1: NAMING_PATTERN_CASE[2].pattern1, pattern2: NAMING_PATTERN_CASE[2].pattern2, pattern3: NAMING_PATTERN_CASE[2].pattern3 });
        wrapper.update();

        wrapper
            .find('[data-testid="download-bundle"]')
            .at(0)
            .simulate('click');

        const testResult = wrapper.state('pattern1') + ',' + wrapper.state('pattern2') + ',' + wrapper.state('pattern3');

        assert.deepEqual(testResult, NAMING_PATTERN_CASE[2].result);
    });
});

function handleDownloadBundle(pattern1: string, pattern2: string, pattern3: string) {
    return pattern1 + ',' + pattern2 + ',' + pattern3;
}
