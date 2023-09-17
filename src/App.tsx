import { Button, Form, Input, Select, Space, Table } from 'antd';
import useCosmic, { UseCosmicProps } from './hooks/useCosmic';
import { useRef, useState } from 'react';
import { FormInstance } from 'antd/es/form/Form';

import Column from 'antd/es/table/Column';

interface TableRowType {
  rowId: number;
  functionProcess: string;
  cosmic: string;
  dataGroup: string;
}

export default function App() {
  const formRef = useRef<FormInstance>(null);

  const [tableData, setTableData] = useState<TableRowType[]>([]);

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onFinish = (values: UseCosmicProps) => {
    event?.preventDefault();
    console.log('Success:', values);
    const cosmicData = useCosmic(values);

    const table = new Array(3).fill(undefined).map((item, index) => {
      return {
        rowId: index,
        functionProcess: cosmicData.functionProcess,
        cosmic: cosmicData.cosmic[index],
        dataGroup: cosmicData.dataGroup
      };
    });

    console.log(table);

    setTableData(table);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1>Cosmic Generator</h1>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ type: 'ERX' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onReset={onReset}
        autoComplete="off"
        className="min-w-[600px]"
      >
        <Form.Item<UseCosmicProps>
          label="发起者"
          name="client"
          initialValue="client"
          rules={[{ required: true, message: '请输入发起者' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item<UseCosmicProps>
          label="入参"
          name="params"
          rules={[{ required: false, message: '请输入传入的参数' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item<UseCosmicProps>
          label="服务"
          name="service"
          initialValue="service"
          rules={[{ required: true, message: '请输入后端服务' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item<UseCosmicProps>
          label="传输对象"
          name="dto"
          initialValue="dto"
          rules={[{ required: true, message: '请输入传输对象' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item<UseCosmicProps>
          label="类型"
          name="type"
          rules={[{ required: false, message: '请选择类型' }]}
        >
          <Select
            allowClear
            options={[
              { value: 'EW', label: 'EW' },
              { value: 'ERX', label: 'ERX' }
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Generate
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table dataSource={tableData} bordered className="w-800px">
        <Column
          title="功能过程"
          dataIndex="functionProcess"
          key="rowId"
          onCell={(_, rowIndex) => {
            return {
              rowSpan: rowIndex === 0 ? 3 : 0
            };
          }}
        />
        <Column title="子过程描述" dataIndex="cosmic" key="cosmic" />
      </Table>
    </div>
  );
}
