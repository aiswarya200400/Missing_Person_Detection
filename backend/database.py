from sqlalchemy import create_engine, Column, Integer, String, Float, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///missing.db")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
