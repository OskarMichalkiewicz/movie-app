import React, { Component } from 'react';


class AddMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      summary: '',
      genre: '',
      imgUrl: ''
    };
    
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async e => {
    console.log(this.props)
    await this.props.onAdd(this.state)
  };

  render() {
    const {
      heading,
      buttonText,
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <h2>{heading}</h2>
          {errors.message && (
            <div className={`alert alert-danger`}>
              <i className='fas fa-info-circle' /> {errors.message}
            </div>
          )}
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            onChange={this.onChange}
          />
          <label htmlFor='genre'>Genre</label>
          <input
            type='text'
            id='genre'
            name='genre'
            placeholder='Genre'
            onChange={this.onChange}
          />
          <label htmlFor='imgUrl'>Img Url</label>
          <input
            type='text'
            id='imgUrl'
            name='imgUrl'
            placeholder='Image Url'
            onChange={this.onChange}
          />
          <label htmlFor='summary'>Summary</label>
          <textarea
            id='summary'
            rows='3'
            noresize
            name='summary'
            placeholder='Summary'
            onChange={this.onChange}
          />
          <input
            type='submit'
            value={buttonText}
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default AddMovieForm;
